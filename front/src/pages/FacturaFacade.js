// FacturaFacade.js
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class FacturaFacade {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async obtenerDatosFactura(idFactura) {
    try {
      const response = await axios.get(`${this.baseUrl}/impresionFactura/${idFactura}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos de factura:", error);
      throw error;
    }
  }

  async generarPDF(datos, elementoId) {
    const content = document.getElementById(elementoId);
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 187, 0, "FAST");
      const archivo = "Factura_" + datos.idFactura + ".pdf";
      pdf.save(archivo);
    });
  }
}

export default FacturaFacade;
