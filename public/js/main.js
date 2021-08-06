const { useState, useEffect, Fragment } = React;

function ProductMain() {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isAllFetched, setIsAllFetched] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  let idAds = [];
  let API_URL = `/api/products?_page=${page}&_limit=${productsPerScroll}${sort?`&_sort=${sort}`:''}`

  useEffect(()=>{
    fetchData()
  },[sort])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [products]);

  const fetchData = () => {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      if (data.length < productsPerScroll) {
        setIsAllFetched(true)
      }else{
        let newProducts = [...products]
        newProducts.push(...data)
        setProducts(newProducts)
      }
    });

  }

  const handleScroll = ()=>{
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isFetching) {
      setIsFetching(true)
      setPage(page+1)
      setTimeout(() => {
        fetchData()
        setIsFetching(false)
      }, loadingDelay);
    }
  }

  const handleSort = (e)=>{
    // reset the page and products
    setPage(1)
    setProducts([])

    setSort(e.target.value)
  }
  
  const generateRandomAdsSource = () =>{
    let random = Math.floor(Math.random()*1000);

    if(!idAds.includes(random)) {
        idAds.push(random);
        return random;
    } else {
      generateRandomAdsSource()
    }
  }

  const ListProduct = ()=>{
    return products.map((product, index) => 
      <Fragment key={index}>
        {index !== 0 && index % productsPerAds === 0 && 
          <img className="ad m-auto d-block" src={`/ads/?r=${generateRandomAdsSource()}`}/>
        }
        <div className="col-3 my-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                ${product.price} <span className="float-end h6">{showDateFromNow(product.date)}</span>
              </h5>
              <div className="card-text text-center" style={{fontSize:product.size}}>{product.face}</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <div className="row">
      <select className="form-select" defaultValue="default" onChange={(e)=>handleSort(e)}>
        <option value="default" disabled>Sort By</option>
        <option value={sortType.price}>Price</option>
        <option value={sortType.size}>Size</option>
        <option value={sortType.id}>ID</option>
      </select>
        <ListProduct/>
        {isFetching && !isAllFetched &&<div className="text-center h2 mb-5">loading...</div>}
        {isAllFetched && <div className="text-center">~ end of catalogue ~</div>}
    </div>
  );
}


ReactDOM.render(<ProductMain />, document.getElementById('app-product'))