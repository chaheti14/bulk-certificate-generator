const templateInput = document.getElementById("templateInput");
const template = document.getElementById("template");

const fontSize = document.getElementById("fontSize");
const fontColor = document.getElementById("fontColor");

const name = document.getElementById("name");


// Upload certificate template
templateInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {
        template.src = URL.createObjectURL(file);
    }

});


// Change font size
fontSize.addEventListener("input", function () {

    name.style.fontSize = this.value + "px";

});


// Change font color
fontColor.addEventListener("input", function () {

    name.style.color = this.value;

});
const namesInput = document.getElementById("namesInput");

let names = [];
const namesList = document.getElementById("namesList");
const nameSelect = document.getElementById("nameSelect");

namesInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const namesInput = document.getElementById("namesInput");

let names = [];
window.allNames = [];

const namesList = document.getElementById("namesList");

namesInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (event) {

            const text = event.target.result;

            const rows = text.split("\n");

            names = rows
                .map(row => row.trim())
                .filter(row => row);

            // Remove the heading "Name"
            if (names[0] === "Name") {
                names.shift();
            }
            window.allNames = [...names];
            console.log("All names saved:", allNames);

            namesList.innerHTML = "";

            names.forEach(function(name) {

                const option = document.createElement("option");
                option.value = name;
                option.textContent = name;

                namesList.appendChild(option);

            });
            nameSelect.innerHTML = '<option value="">Select a name</option>';

            names.forEach(function(name) {

             const option = document.createElement("option");

            option.value = name;
            option.textContent = name;

            nameSelect.appendChild(option);

});

            console.log(names);

        };

        reader.readAsText(file);

    }

});
nameSelect.addEventListener("change", function() {

    name.textContent = this.value || "Your Name";

});

    }

});
const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", function() {

    const certificate = document.getElementById("certificate");

    html2canvas(certificate).then(function(canvas) {

        const link = document.createElement("a");

        link.download = "My-Certificate.png";
        link.href = canvas.toDataURL("image/png");

        link.click();

    });

});
const nameX = document.getElementById("nameX");
const nameY = document.getElementById("nameY");

nameX.addEventListener("input", function() {
    name.style.left = nameX.value + "%";
});

nameY.addEventListener("input", function() {
    name.style.top = nameY.value + "%";
});
let allNames = [];
const bulkDownloadBtn = document.getElementById("bulkDownloadBtn");

bulkDownloadBtn.addEventListener("click", async function() {
    console.log("Loaded names:",window.allNames);
    if (!window.allNames || window.allNames.length === 0) {
        alert("Please upload a CSV file first!");
        return;
    }

    for (const participant of window.allNames) {

        name.textContent = participant;

        await new Promise(resolve => setTimeout(resolve, 300));

        const canvas = await html2canvas(
            document.getElementById("certificate")
        );

        const link = document.createElement("a");

        link.download = participant.replace(/[^a-z0-9]/gi, "_") + "_Certificate.png";
        link.href = canvas.toDataURL("image/png");

        link.click();

        await new Promise(resolve => setTimeout(resolve, 300));
    }

    alert("All certificates generated successfully!");

});

const pdfDownloadBtn = document.getElementById("pdfDownloadBtn");

pdfDownloadBtn.addEventListener("click", async function () {
    if (!window.allNames || window.allNames.length === 0) {
        alert("Please upload a CSV file first!");
        return;
    }

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [800, 565]
    });

    const certificate = document.getElementById("certificate");
    const originalName = name.textContent;

    try {
        for (let i = 0; i < window.allNames.length; i++) {
            name.textContent = window.allNames[i];

            await new Promise(resolve => setTimeout(resolve, 200));

            const canvas = await html2canvas(certificate, {
                scale: 2,
                useCORS: true
            });

            const image = canvas.toDataURL("image/png");

            if (i > 0) {
                pdf.addPage([800, 565], "landscape");
            }

            pdf.addImage(image, "PNG", 0, 0, 800, 565);
        }

        pdf.save("All_Certificates.pdf");
        alert("Combined PDF downloaded successfully!");
    } catch (error) {
        console.error(error);
        alert("PDF could not be generated. Please check the Console.");
    } finally {
        name.textContent = originalName;
    }
});