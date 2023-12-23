function deleteProduct(id){
    const result=confirm("are you sure you want to delete that product");

    if(result){
        fetch("/delete-product/"+id,{
            method:'POST',
        }).then((res)=>{
            if(res.ok){
                location.reload();
            }
        })
    }
}