// Boilerplate
const sketch = require("sketch");
const UI = require("sketch/ui");
const document = require("sketch/dom").getSelectedDocument();

// Forward declarations
let selectedLayer = null;
let selectedLayerName = null;
let currentLayerSelection = document.selectedLayers;
let associatedLayers = null;
let textLayerCount = 0;
let newText = "";

if (!currentLayerSelection.length) {
    UI.alert("Warning", "No layer selected. Have a word...");
} else if (currentLayerSelection.length > 1) {
    // Only works when you select a single layer...
    // Warn the user.
    UI.alert("Warning", "Please calm down, and select a single layer...");
} else {
    // We only need the first layer. There should be only one (Highlander)...
    selectedLayer = currentLayerSelection.layers[0];

    if (selectedLayer.type == "Text") {
        selectedLayerName = selectedLayer.name;
        associatedLayers = document.getLayersNamed(selectedLayerName);

        newText = UI.getStringFromUser(
            "Enter the updated copy",
            "New copy here..."
        );

        if (!newText.length) {
            // Warn the user if they've written sweet F/A
            UI.alert(
                "Warning",
                "You've written sweet F/A... What kind of copy writer are you!!?"
            );
        } else {
            associatedLayers.forEach(layer => {
                // Need to check if each layer in this collection is a text layer...
                if (layer.type == "Text") {
                    // Make a count of the layers changed...
                    textLayerCount++;
                    // And change them.
                    layer.text = newText;
                }
            });

            // Tell the user how many items have changed.
            UI.message(`${textLayerCount} changed...`);
        }
    } else {
        UI.alert("Warning", "Only works on text layers...");
    }
}
