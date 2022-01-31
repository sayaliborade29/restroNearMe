// Form validation
function validate() {
    if (document.searchForm.addressSearchKey.value == "") {
        alert("Please provide something to search!");
        document.searchForm.addressSearchKey.focus();
        return false;
    }
    loadResult();
}


function loadResult() {
    const url = `http://localhost:3000/api/address/address-search?addressSearchKey=${document.searchForm.addressSearchKey.value}`;
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(async response => {
        const data = await response.json();

        if (data) {
            document.getElementById("map-grid").innerHTML = data.result;
        } else {
            document.getElementById("map-grid").innerHTML = "No Records Found!"
        }
        
        return (true);
    });
}
