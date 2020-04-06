/** Single Map Marker and infoWindow */

/* === First attempt: based on Google Maps example, as I can't get the Code Institute example to work properly. :-(
function initMap(){
    var home = { lat: 53.2746337, lng: -6.3487928 }; // My home coords for centering the map, and for marking my home
    var map = new google.maps.Map(document.getElementById("map"), {zoom: 6, center: home}); // Create a new Map and center on Home
    var marker = new google.maps.Marker({position: home, map: map}); // Create a Marker for Home on Map
}
*/

/* === Second attempt: Bill Traversy @ Traversy Media - https://www.youtube.com/watch?v=Zxf1mnP5zcw */
/*
function initMap() {
    var home = { lat: 53.2746337, lng: -6.3487928 }; // My home coords for centering the map, and for marking my home
    var map = new google.maps.Map(document.getElementById("map"), { zoom: 5, center: home }); // Create a new Map and center on Home

    addMarker(home); // Dublin, Ireland
    addMarker({ lat: 51.5074, lng: 0.1278 }); // London, England 51.5074° N, 0.1278° W
    addMarker({ lat: 54.5973, lng: -5.9301 }); // Belfast, Northern Ireland 54.5973° N, 5.9301° W
    addMarker({ lat: 51.4816, lng: -3.1791 }); // Cardiff, Wales 51.4816° N, 3.1791° W
    addMarker({ lat: 55.9533, lng: -3.1883 }); // Edinburg, Scotland 55.9533° N, 3.1883° W

    function addMarker(coords){
        var marker = new google.maps.Marker({position: coords, map: map});
    }
}
*/

/* === Third attempt: Bill Traversy @ Traversy Media - https://www.youtube.com/watch?v=Zxf1mnP5zcw
Added several Locations/Markers with iconImage, and Content ("tool-tips")
Added Mouseover and Mouseout as it's user-friendly and performs nicer than Click */
/*
function initMap() {
    var home = { lat: 53.2746337, lng: -6.3487928 }; // My home coords for centering the map, and for marking my home
    var map = new google.maps.Map(document.getElementById("map"), { zoom: 5, center: home }); // Create a new Map and center on Home

    // Dublin, Ireland
    addMarker({
        coords: home,
        iconImage: '/assets/images/150px-IRL_Dublin_flag.svg.png',
        content: `<h3>Dublin, Ireland</h3><hr><p>6 Oldcourt Close, Ballycullen, D24 RHY2</p><p>Dublin, Ireland</p>`
    });

    // London, England 51.5074° N, 0.1278° W
    addMarker({
        coords:{ lat: 51.5074, lng: 0.1278 },
        content: `London, England 51.5074° N, 0.1278° W`
    });

    // Belfast, Northern Ireland 54.5973° N, 5.9301° W
    addMarker({
        coords:{ lat: 54.5973, lng: -5.9301 },
        content: `Belfast, Northern Ireland 54.5973° N, 5.9301° W`
    });

    // Cardiff, Wales 51.4816° N, 3.1791° W
    addMarker({
        coords:{ lat: 51.4816, lng: -3.1791 },
        content: `Cardiff, Wales 51.4816° N, 3.1791° W`
    });

    // Edinburg, Scotland 55.9533° N, 3.1883° W
    addMarker({
        coords:{ lat: 55.9533, lng: -3.1883 },
        content: `Edinburg, Scotland 55.9533° N, 3.1883° W`
    });

    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            iconImage: props.iconImage
        });

        // Check for separate icon for this marker (see if iconImage exists)
        if(props.iconImage){
            // Set iconImage
            marker.setIcon(props.iconImage);
        }

        if(props.content){
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener("mouseover", function(){
                infoWindow.open(map, marker);
            });

            marker.addListener("mouseout", function(){
                infoWindow.close(map, marker);
            });
        }
    }
}
*/

/* === Fourth attempt: Bill Traversy @ Traversy Media - https://www.youtube.com/watch?v=Zxf1mnP5zcw
Added several Locations/Markers with iconImage, and Content ("tool-tips")
Added Mouseover and Mouseout as it's user-friendly and performs nicer than Click */
function initMap() {
    var home = { lat: 53.2746337, lng: -6.3487928 }; // My home coords for centering the map, and for marking my home
    var map = new google.maps.Map(document.getElementById("map"), { zoom: 5, center: home }); // Create a new Map and center on Home

    var markersArray = [
        {
            coords: home,
            iconImage: '/assets/images/150px-IRL_Dublin_flag.svg.png',
            content: `<h3>Dublin, Ireland</h3><hr><p>6 Oldcourt Close, Ballycullen, D24 RHY2</p><p>Dublin, Ireland</p>`
        },
        {
            coords: { lat: 51.5074, lng: 0.1278 },
            content: `London, England 51.5074° N, 0.1278° W`
        },
        {
            coords: { lat: 54.5973, lng: -5.9301 },
            content: `Belfast, Northern Ireland 54.5973° N, 5.9301° W`
        },
        {
            coords: { lat: 51.4816, lng: -3.1791 },
            content: `Cardiff, Wales 51.4816° N, 3.1791° W`
        },
        {
            coords: { lat: 55.9533, lng: -3.1883 },
            content: `Edinburg, Scotland 55.9533° N, 3.1883° W`
        }
    ];

    for(var i = 0; i < markersArray.length; i++){
        addMarker(markersArray[i]);
    }

    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            iconImage: props.iconImage,
            content: props.content
        });

        // Check for separate icon for this marker (see if iconImage exists)
        if (props.iconImage) {
            // Set iconImage
            marker.setIcon(props.iconImage);
        }

        // Check for Content for "tool-tip"
        if (props.content) {
            // Set Content for each Marker
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener("mouseover", function () {
                infoWindow.open(map, marker);
            });

            marker.addListener("mouseout", function () {
                infoWindow.close(map, marker);
            });
        }
    }
}