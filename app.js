window.addEventListener('load', () => {
    let long;
    let latt;
    const temp =document.querySelector(".temp");
    const tempSpan = document.querySelector(".temp span")
    let tempDescription = document.querySelector(".tempDescription");
    let tempDegree = document.querySelector(".tempDegree");
    let timezone = document.querySelector(".timezone");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            latt = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latt},${long}`;
            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    // ?console.log(data);
                    const {temperature,summary, icon} = data.currently;
                    tempDegree.textContent=temperature;
                    tempDescription.textContent=summary;
                    timezone.textContent=data.timezone;
                    let celsius = (temperature -32)*(5/9);
                    icons(icon, document.querySelector(".icon"));

                    //* change to celsius
                    temp.addEventListener('click', function(){
                        if(tempSpan.textContent=='F'){
                            tempSpan.textContent='C';
                            tempDegree.textContent=Math.floor(celsius);
                        }
                        else{
                            tempSpan.textContent='F';
                            tempDegree.textContent=temperature;
                        }
                    })


                })
        });
    } else {
        document.querySelector("h1").textContent = "Allow the Location access!";
    }
    function icons(icon, iconId){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }

});