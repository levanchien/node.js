function ajaxGet() {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('demo').innerHTML = this.responseText;
            console.log(this.getResponseHeader("Content-Type"))
        }
    }

    xhttp.open('GET', 'https://jsonplaceholder.typicode.com/posts', true)
    xhttp.send();
}

document.getElementById('btnLoadData').addEventListener('click', () => {
    ajaxGet();
})