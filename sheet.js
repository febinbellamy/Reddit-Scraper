const { GoogleSpreadsheet } = require("google-spreadsheet");

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet(
      "1RxRawgrexPBPUx7S5nkXoT_lgDdOVmVNjMYBmTx6SAA"
    );
  }

  async load() {
    await this.doc.useServiceAccountAuth(require("./credentials.json"));
    await this.doc.loadInfo();
  }

  async addSheet(title, headerValues) {
    await this.doc.addSheet({ title, headerValues });
    return this.doc.sheetsByIndex.length - 1;
  }

  async addRows(rows, i) {
    const sheet = this.doc.sheetsByIndex[i];
    await sheet.addRows(rows);
  }
  
  async getRows(i) {
    const sheet = this.doc.sheetsByIndex[i];
    const rows = await sheet.getRows();
    return rows;
  }
};
