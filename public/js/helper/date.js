const showDateFromNow = (date)=>{
    const now = new Date();
    const dateProduct = new Date(date);
    const differentTime = Math.abs(dateProduct - now);
    const differentDay = Math.ceil(differentTime / (1000 * 60 * 60 * 24)); 

    if (differentDay < 7) {
        return `${differentDay} ${differentDay < 2 ? 'day': 'days'} ago`;
    }
    else{
        return formatDate(dateProduct);
    }
}

const formatDate = (date)=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}