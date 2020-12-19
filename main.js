require([
  "esri/intl",
  "esri/WebScene",
  "esri/views/SceneView",
  "modules/LayerList.js",
  "modules/Daylight.js", 
  "modules/Editor.js",
  "modules/ElevationProfile.js",
  "modules/LineOfSight.js",
 
 
], function (intl, WebScene, SceneView, LayerList, Daylight, Editor, ElevationProfile, LineOfSight ) {

  // Set app locale to Norwegian
  intl.setLocale('nb');

  /****************************************************************************
   *  Create Web Scene and View
   ***************************************************************************/
  let webscene = new WebScene({
    portalItem: {
      id: "bd8f9599b6dd42b6bd4f0a5ab381b5b6"
    }
  });

  var view = new SceneView({
    container: "viewDiv",
    qualityProfile: "high",
    environment: {
      atmosphere: {
        quality: "high"
      },
      lighting: {
        date: new Date(),
        directShadowsEnabled: true
      }
    },
    map: webscene
  });

  /****************************************************************************
   *  Create widgets and add to UI
   ***************************************************************************/ 
  LayerList.addWidget(view);
  Daylight.addWidget(view);
  Editor.addWidget(view);
  ElevationProfile.addWidget(view);
  LineOfSight.addWidget(view);
  
  view.when(function () {
    view.popup.autoOpenEnabled = false; //disable popups
    const plannedBuildingsLayer = view.map.layers
      .filter((layer) => {
        return (
          layer.title === "Mulighetsrom"
        );
      })
      .getItemAt(0);

    document
      .getElementById("layerVisibility")
      .addEventListener("change", (event) => {
        plannedBuildingsLayer.visible = event.target.checked;
      });

  });
});