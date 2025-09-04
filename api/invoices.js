import fs from "fs";
import path from "path";

export default function handler(req, res) {
    // locate db.json
    const filePath = path.join(process.cwd(), "db.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const db = JSON.parse(jsonData);

    if (req.method === "GET") {
        res.status(200).json(db.invoices);
    } else if (req.method === "POST") {
        const newInvoice = req.body;
        db.invoices.push(newInvoice);

        fs.writeFileSync(filePath, JSON.stringify(db, null, 2));

        res.status(201).json(newInvoice);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
