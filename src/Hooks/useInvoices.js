import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useInvoices() {
    return useQuery({
        queryKey: ["invoices"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:4000/invoices");
            return res.data;
        },
    });
}
