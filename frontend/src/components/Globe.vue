<template>
    <div class="globe-container">
      <div id="globeViz" style="width: 100%; height: 100vh;"></div>
    </div>
  </template>
  
  <script>
  import Globe from "globe.gl";
  
  export default {
    name: "Globe",
    mounted() {
      fetch("/datasets/ne_110m_admin_0_countries.geojson")
        .then((res) => res.json())
        .then((countries) => {
          // Add a custom marker for Niamey, Niger's capital
          const niameyMarker = {
            lat: 15.4162,
            lng: 6.1698, 
            color: "#F6DCA0",
            label: "Abalak",
            size: 1 // Larger size for visibility
          };
  
          const world = Globe()
            .backgroundColor("white")
            .globeImageUrl("../public/earth-blue.png")
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.2)
            .hexPolygonUseDots(true)
            .hexPolygonColor((d) => {
              return d.properties.ISO_A2 === "NE" ? "#1D5891" : "white"; // Default for Niger
            })
            .hexPolygonLabel(({ properties: d }) => {
              return `<b>${d.ADMIN} (${d.ISO_A2})</b> <br /> Population: <i>${d.POP_EST}</i>`;
            })
            .pointsData([niameyMarker]) // Add Niamey marker
            .pointColor("color") // Use the color specified in the marker
            .pointLabel("label") // Use the label specified in the marker
            .pointAltitude(0.01) // Adjust marker altitude for better visibility
            .pointRadius((d) => d.size); // Use custom size for the point
  
          // Mount the globe
          world(document.getElementById("globeViz"));
  
          // Center the view near Niamey (latitude: 13.5124, longitude: 2.1108)
          world.pointOfView({lat: 15.4162,lng: 6.1698, altitude: 1.5 });
        });
    },
  };
  </script>
  
  <style>
  body {
    margin: 0;
    overflow: hidden;
  }
  </style>
  