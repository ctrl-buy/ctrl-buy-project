// console.log(mapToken)
mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: data.geometry.coordinates,
    zoom: 9
});
const marker1 = new mapboxgl.Marker()
    .setLngLat(data.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h4>${data.location},${data.country}</h4><p>Exact location provided after buy</p>`)
        .setMaxWidth("400px"))
    .addTo(map);

