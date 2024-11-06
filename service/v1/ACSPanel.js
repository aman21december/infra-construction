const infraacadmic = require("../../models/infraacademic");
const infraadminstrative = require("../../models/infraadminstrative");
const infraother = require("../../models/infraother");
const { User } = require("../../models/user");

class ACSPanel{
  async getData(req, res, next) {
    const {
        search = "",
        filters = [],
        exportFlag = false,
        exportType = "pdf",
        status=""
    } = req.query;
   
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;
    const offset = (page - 1) * limit;
    // Define where conditions for User and associated models
    const userWhere = { role: 'SCHOOL' };
    const associationWhere = {};

    // Apply search condition on associated models
    if (search) {
        associationWhere[Op.or] = [
            { applicationId: { [Op.like]: `%${search}%` } },
            { CollegeName: { [Op.like]: `%${search}%` } },
        ];
    }
    if (status) associationWhere.status = status;
    // Apply filters if provided
    filters.forEach(filter => {
        if (filter.field === 'createdAt' && filter.startDate && filter.endDate) {
            associationWhere[filter.field] = {
                [Op.between]: [new Date(filter.startDate), new Date(filter.endDate)]
            };
        } else {
            associationWhere[filter.field] = filter.value;
        }
    });

    try {
        // Fetch data with associations and filtering
        const data = await User.findAndCountAll({
            where: userWhere,
            attributes: { exclude: ['password'] },
            include: [
                { model: infraacadmic, where: associationWhere, required: false },
                { model: infraadminstrative, where: associationWhere, required: false },
                { model: infraother, where: associationWhere, required: false }
            ],
            limit: exportFlag ? undefined : limit,
            offset: exportFlag ? undefined : offset,
        });

        if (exportFlag) {
            // Handle export logic for PDF or Excel if exportFlag is true
            const exportedData = await this.exportData(data.rows, exportType);
            return res.json({ fileUrl: exportedData.fileUrl });
        }

        const totalPages = Math.ceil(data.count / limit);

        // Render response with paginated data if exportFlag is false
        return res.render("deopanel.ejs", {
            data: data.rows,
            currentPage: page,
            totalPages
        });
    } catch (err) {
        return next(err);
    }
}

saveAndGenerateDownloadLink(buffer, fileType) {
    const fileId = uuidv4();
    const filePath = path.resolve(__dirname, `../../exports/${fileId}.${fileType}`);
    
    // Ensure the exports directory exists
    if (!fs.existsSync(path.resolve(__dirname, "../../exports"))) {
        fs.mkdirSync(path.resolve(__dirname, "../../exports"));
    }

    fs.writeFileSync(filePath, buffer);
    
    // Assuming you are hosting the files at `http://localhost:5000/downloads/`
    return `http://localhost:5000/downloads/${fileId}.${fileType}`;
}

// Helper function to generate PDF
// Helper function to generate PDF
// Helper function to generate PDF
async generatePdf(data) {
// Convert main records to plain objects and include associated data
const plainData = data.map(item => item.get({ plain: true }));

const browser = await puppeteer.launch();
const page = await browser.newPage();

// Render HTML content for PDF (customize as needed)
const htmlContent = `
    <html>
        <head>
            <style>
                /* Add custom styling for the PDF */
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>Exported Data</h1>
            <table>
                <tr>
                    ${Object.keys(plainData[0]).map(key => `<th>${key}</th>`).join("")}
                    <th>Infraadministrative</th>
                    <th>Infraother</th>
                </tr>
                ${plainData.map(row => `
                    <tr>
                        ${Object.values(row).map(value => `<td>${value !== null && typeof value === 'object' ? JSON.stringify(value) : value}</td>`).join("")}
                        <td>${row.infraadministrative ? JSON.stringify(row.infraadministrative) : 'N/A'}</td>
                        <td>${row.infraother ? JSON.stringify(row.infraother) : 'N/A'}</td>
                    </tr>
                `).join("")}
            </table>
        </body>
    </html>
`;

await page.setContent(htmlContent);
const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    scale: 0.2, // Scale the content to fit better
    landscape: true, // Use landscape mode for better horizontal space
    pageRanges: '1', // Optional: specify page range for multi-page PDFs
    preferCSSPageSize: true, // Use CSS-defined page size
});

await browser.close();
return pdfBuffer;
}



// Helper function to generate Excel file
async generateExcel(data) {
    const plainData = data.map(item => item.get({ plain: true })); // Convert to plain objects

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Exported Data');

    // Define columns based on data keys (from the first item as a sample)
    worksheet.columns = Object.keys(plainData[0]).map(key => ({ header: key, key }));

    // Add rows
    plainData.forEach(row => {
        worksheet.addRow(row);
    });

    // Save to buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

// Main exportData function
async exportData(data, exportType) {
    if (exportType === "pdf") {
        const pdfBuffer = await this.generatePdf(data);
        return { fileUrl: this.saveAndGenerateDownloadLink(pdfBuffer, "pdf") };
    } else if (exportType === "excel") {
        const excelBuffer = await this.generateExcel(data);
        return { fileUrl: this.saveAndGenerateDownloadLink(excelBuffer, "xlsx") };
    }
    throw new Error("Unsupported export type");
}
}

module.exports={ACSPanel}