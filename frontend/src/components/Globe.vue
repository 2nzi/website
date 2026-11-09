<template>
  <div class="globe-container">
    <div id="globeViz"></div>
  </div>
</template>

<script>
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
      // Le globe occupe toute la largeur et la hauteur de son conteneur
      this.globeWidth = this.$el.clientWidth || window.innerWidth;
      this.globeHeight = this.$el.clientHeight || 600;
    },
    initGlobe() {
      // globe.gl (three.js) est chargé à la demande pour alléger la page d'accueil
      Promise.all([
        import("globe.gl"),
        fetch("/datasets/ne_110m_admin_0_countries.geojson").then((res) => res.json())
      ])
        .then(([{ default: Globe }, countries]) => {
          const niameyMarker = {
            lat: 15.4162,
            lng: 6.1698,
            color: "#F6DCA0",
            label: "Abalak",
            size: 0.5
          };

          const world = Globe()
            .backgroundColor("white")
            .globeImageUrl("/earth-blue.png")
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

          // Vue initiale éloignée
          world.pointOfView({
            lat: 0,
            lng: 0,
            altitude: 4
          });

          // Animation de zoom après un délai
          setTimeout(() => {
            const targetView = {
              lat: 15.4162,
              lng: 6.1698,
              altitude: 1.9
            };

            const duration = 5000; // Durée de l'animation en ms
            const startView = world.pointOfView();
            const startTime = Date.now();

            function animate() {
              const currentTime = Date.now();
              const progress = Math.min(1, (currentTime - startTime) / duration);

              // Fonction d'easing pour une animation plus fluide
              const easeInOutCubic = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
              const easedProgress = easeInOutCubic(progress);

              world.pointOfView({
                lat: startView.lat + (targetView.lat - startView.lat) * easedProgress,
                lng: startView.lng + (targetView.lng - startView.lng) * easedProgress,
                altitude: startView.altitude + (targetView.altitude - startView.altitude) * easedProgress
              });

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            }

            animate();
          }, 1000); // Délai avant le début du zoom

          // Gestion du redimensionnement
          this.resizeObserver = new ResizeObserver(() => {
            this.updateGlobeDimensions();
            world
              .width(this.globeWidth)
              .height(this.globeHeight);
          });
          this.resizeObserver.observe(this.$el);
        })
        .catch((err) => console.error("Globe:", err));
    }
  },
  mounted() {
    this.updateGlobeDimensions();
    // Ne démarre le globe (et son animation) que lorsqu'il devient visible
    if (!("IntersectionObserver" in window)) {
      this.initGlobe();
      return;
    }
    this.observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        this.observer.disconnect();
        this.initGlobe();
      }
    }, { rootMargin: "200px" });
    this.observer.observe(this.$el);
  },
  beforeUnmount() {
    if (this.observer) this.observer.disconnect();
    if (this.resizeObserver) this.resizeObserver.disconnect();
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

#globeViz :deep(canvas) {
  display: block;
}
</style>
