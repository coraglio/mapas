window.addEventListener('load', function (event) {
  // initialize the map on the "map" div with a given center and zoom
  var map = L.map('map', {
    center: [-34.5946054, -58.3702778],
    zoom: 3,
  });

  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
  //   foo: 'bar',
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   detectRetina: true,
  // }).addTo(map);

  var layer = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    // 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    // 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmVkZWNvcmFnbGlvIiwiYSI6ImNreHQ2dWEyZTJ2Z3UyeHBlcjR1NGV1c2oifQ.KGLQb34FuBzVUJmnRNxf2A',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.google.com/">Google</a>',
      tileSize: 512,
      zoomOffset: -1,
      detectRetina: true,
      updateWhenIdle: true,
      keepBuffer: 10,
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }
  ).addTo(map);

  console.log(layer);

  $.getJSON('assets/red.geojson', (data) => {
    // console.log(data)
    var red = L.geoJSON(data, {
      // style: function (feature) {
      //   return { color: feature.properties.color };
      // },
      style: { color: 'red' },
    })
      .bindTooltip(function (layer) {
        // return layer.feature.properties.LINEA;
        return 'LINEA URQUIZA';
      })
      // .bindPopup(function (layer) {
      //   return layer.feature.properties.LINEA;
      // })
      .addTo(map);

    map.fitBounds(red.getBounds());
  });

  // Incon of stations
  var trainIcon = L.icon({
    iconUrl: 'assets/train-icon-2.png',
    iconSize: [20, 20], // size of the icon
    // iconAnchor: [0,0], // point of the icon which will correspond to marker's location
    // popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  $.getJSON('assets/estaciones.geojson', (data) => {
    // console.log(data)
    var red = L.geoJSON(data, {
      // style: function (feature) {
      //   return { color: feature.properties.color };
      // },
      style: { color: 'green' },
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, { icon: trainIcon });
      },
    })
      .bindTooltip((layer) => {
        return layer.feature.properties.NOMBRE_1;
        // return {'Estación 1', { permanent: true, className: 'my-label', offset: [32, 0] }}
      })
      .bindPopup(function (layer) {
        return `<h3>${layer.feature.properties.NOMBRE}</h3>
                <lu>
                  <li>NOMENCL: ${layer.feature.properties.NOMENCL}</li>
                  <li>LINEA: ${layer.feature.properties.LINEA}</li>
                </lu>`;
        return layer.feature.properties.NOMBRE_1;
      })
      .addTo(map);

    map.fitBounds(red.getBounds());
  });

  // var station1 = L.marker([-34.5946054, -58.3702778], { icon: trainIcon }).addTo(map);
  // var station2 = L.marker([-34.5752818, -58.401521], { icon: trainIcon, title: 'Estación 2' }).addTo(map);
  // station1.bindPopup(
  //   "<h3>Puerto Madero</h3><p>cualquier contenido HTML</p><img src='assets/foto.jpg' class='foto-popup'/>",
  //   { maxWidth: 300, minWidth: 300 }
  // );
  // station2.bindPopup("<h3>Saldías</h3><p>cualquier contenido HTML</p><img src='assets/foto.jpg' class='foto-popup'/>", {
  //   maxWidth: 300,
  //   minWidth: 300,
  // });

  // station1.bindTooltip('Estación 1', { permanent: true, className: 'my-label', offset: [32, 0] });
  // station2.bindTooltip('Estación 2', { permanent: true, className: 'my-label', offset: [32, 0] });
  // // create a red polyline from an array of LatLng points
  // var latlngs = [
  //   [-34.5946054, -58.3702778],
  //   [-34.5752818, -58.401521],
  // ];

  // var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);

  // // zoom the map to the polyline
  // map.fitBounds(polyline.getBounds());
});
