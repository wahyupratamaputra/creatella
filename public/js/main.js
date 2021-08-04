const { useState, useEffect } = React;

function ProductMain() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetch('/api/products')
    .then(response => response.json())
    .then(data => {
        setProducts(data)
    });
  },[])

  const ListProduct = ()=>{
    return products.map((product, index) => 
      <div className="col-3" key={index}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">${product.price}</h5>
            <div className="card-text" style={{fontSize:product.size}}>{product.face}</div>
            <div>{product.date}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
        <ListProduct/>
    </div>
  );
}


ReactDOM.render(<ProductMain />, document.getElementById('app-product'))