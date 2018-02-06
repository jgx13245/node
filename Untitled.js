function get(url,fn){
    var xhr;
    if(window.xmlHttpReauest){
        xhr =new  XMLHtttpRequest();
    }else{
        xhr = new ActiveXObject(Msxml2.xmlHttp);;
    }
    xhr.open("get","url",true);
    xhr.send();
    xhr.onreadystatechange=function(){
        if(xhr.readychange==200&&xhr.readychange==4){
            if(fn){
                fn(xhr.Response);
            }
        }
    }
}