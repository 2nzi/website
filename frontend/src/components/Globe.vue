  <template>
    <div class="globe-container">
      <div id="globeViz"></div>
    </div>
  </template>
  
  <script>
  import Globe from "globe.gl";
  
  export default {
    name: "Globe",
    data() {
      return {
        globeWidth: 600,
        globeHeight: 400
      }
    },
    methods: {
      updateGlobeDimensions() {
      if (window.innerWidth <= 480) {  // Mobile
        this.globeWidth = 280;
        this.globeHeight = 500;
      } else if (window.innerWidth <= 768) {  // Tablette
        this.globeWidth = 350;
        this.globeHeight = 620;
      } else if (window.innerWidth <= 1024) {  // Petit écran
        this.globeWidth = 400;
        this.globeHeight = 710;
      } else {  // Grand écran
        this.globeWidth = 450;
        this.globeHeight = 800;
      }
    },
      initGlobe() {
        fetch("/datasets/ne_110m_admin_0_countries.geojson")
          .then((res) => res.json())
          .then((countries) => {
            const niameyMarker = {
              lat: 15.4162,
              lng: 6.1698,
              color: "#F6DCA0",
              label: "Abalak",
              size: 0.5
            };
  
            const world = Globe()
              .backgroundColor("white")
              .globeImageUrl("../public/earth-blue.png")
              .width(this.globeWidth)
              .height(this.globeHeight)
              .hexPolygonsData(countries.features)
              .hexPolygonResolution(3)
              .hexPolygonMargin(0.2)
              .hexPolygonUseDots(true)
              .hexPolygonColor((d) => {
                return d.properties.ISO_A2 === "NE" ? "#1D5891" : "white";
              })
              .hexPolygonLabel(({ properties: d }) => {
                return `<b>${d.ADMIN} (${d.ISO_A2})</b> <br /> Population: <i>${d.POP_EST}</i>`;
              })
              .pointsData([niameyMarker])
              .pointColor("color")
              .pointLabel("label")
              .pointAltitude(0.01)
              .pointRadius((d) => d.size);
  
            // Mount the globe
            world(document.getElementById("globeViz"));
  
            // Vue globale centrée
            world.pointOfView({lat: 15.4162,lng: 6.1698, altitude: 2 });

  
            // Gestion du redimensionnement
            window.addEventListener('resize', () => {
              this.updateGlobeDimensions();
              world
                .width(this.globeWidth)
                .height(this.globeHeight);
            });
          });
      }
    },
    mounted() {
      this.updateGlobeDimensions();
      this.initGlobe();
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.updateGlobeDimensions);
    }
  };
  </script>
  
  <style scoped>
.globe-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#globeViz {
  width: 100%;
  height: 100%;
}

/* Styles responsives pour le conteneur */
@media (max-width: 480px) {
  .globe-container {
    max-width: 280px;
    height: 500px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .globe-container {
    max-width: 350px;
    height: 620px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .globe-container {
    max-width: 400px;
    height: 710px;
  }
}

@media (min-width: 1025px) {
  .globe-container {
    max-width: 450px;
    height: 800px;
  }
}
</style>