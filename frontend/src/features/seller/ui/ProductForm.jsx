import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import api from "../../../api/api";
import Navbar from "../../../shared/Navbar";

const emptySizes = [
  { size: "S", stock: 0 },
  { size: "M", stock: 0 },
  { size: "L", stock: 0 },
  { size: "XL", stock: 0 },
];

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const [form, setForm] = useState({ title: "", description: "", amount: "", currency: "INR" });
  const [sizes, setSizes] = useState(emptySizes);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(editing);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!editing) return;
    const load = async () => {
      try {
        const res = await api.get("/products");
        const product = (res.data?.data?.products || []).find((item) => item._id === id);
        if (!product) throw new Error("Product not found");
        setForm({ title: product.title || "", description: product.description || "", amount: product.price?.amount || "", currency: product.price?.currency || "INR" });
        setSizes(product.sizes?.map(({ size, stock }) => ({ size, stock })) || []);
      } catch (error) {
        toast.error(error.message === "Product not found" ? error.message : error.response?.data?.message || "Unable to load product");
        navigate("/seller");
      } finally { setLoading(false); }
    };
    load();
  }, [editing, id, navigate]);

  const updateSize = (index, value) => setSizes((current) => current.map((item, i) => i === index ? { ...item, stock: Number(value) } : item));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.amount || sizes.length === 0) {
      toast.error("Please complete all product fields");
      return;
    }
    try {
      setSubmitting(true);
      const payload = {
        title: form.title,
        description: form.description,
        price: { amount: Number(form.amount), currency: form.currency },
        sizes,
      };

      if (editing) {
        await api.put(`/products/${id}`, payload);
        toast.success("Product updated successfully");
      } else {
        const data = new FormData();
        data.append("title", form.title);
        data.append("description", form.description);
        data.append("price", JSON.stringify(payload.price));
        data.append("sizes", JSON.stringify(sizes));
        files.forEach((file) => data.append("images", file));
        if (!files.length) {
          toast.error("Please select at least one product image");
          setSubmitting(false);
          return;
        }
        await api.post("/products", data);
        toast.success("Product created successfully");
      }
      navigate("/seller");
    } catch (error) {
      toast.error(error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || "Unable to save product");
    } finally { setSubmitting(false); }
  };

  if (loading) return <><Navbar /><div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-gray-500">Loading...</div></>;

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#171513]"><Navbar /><main className="max-w-3xl mx-auto px-6 py-12"><Link to="/seller" className="text-sm font-semibold hover:text-[#d96f2b]">← Back to dashboard</Link><div className="bg-white border border-[#e4dfd8] rounded-3xl p-7 md:p-10 mt-7"><div><p className="text-[#d96f2b] text-sm font-semibold uppercase tracking-widest">Seller tools</p><h1 className="text-3xl md:text-4xl font-bold mt-2">{editing ? "Edit Product" : "Add Product"}</h1></div><form onSubmit={submit} className="flex flex-col gap-6 mt-8">
      <div className="flex flex-col gap-2"><label className="font-semibold">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border rounded-xl px-4 py-3 outline-none focus:border-black" placeholder="Product title" /></div>
      <div className="flex flex-col gap-2"><label className="font-semibold">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="5" className="border rounded-xl px-4 py-3 outline-none focus:border-black resize-none" placeholder="Describe your product" /></div>
      <div className="grid sm:grid-cols-[1fr_140px] gap-4"><div className="flex flex-col gap-2"><label className="font-semibold">Price</label><input type="number" min="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="border rounded-xl px-4 py-3 outline-none focus:border-black" /></div><div className="flex flex-col gap-2"><label className="font-semibold">Currency</label><input value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })} className="border rounded-xl px-4 py-3 outline-none focus:border-black" /></div></div>
      <div><label className="font-semibold">Sizes & stock</label><div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">{sizes.map((item, index) => <div key={item.size} className="border rounded-xl p-3"><p className="font-bold">{item.size}</p><input type="number" min="0" value={item.stock} onChange={(e) => updateSize(index, e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-2" placeholder="Stock" /></div>)}</div></div>
      {!editing && <div className="flex flex-col gap-2"><label className="font-semibold">Product images</label><input type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} className="border rounded-xl p-3" /><p className="text-xs text-gray-500">Up to 5 images, 1 MB each.</p></div>}
      <button disabled={submitting} className="py-3.5 rounded-xl bg-[#171513] text-white font-semibold disabled:opacity-50">{submitting ? "Saving..." : editing ? "Update Product" : "Create Product"}</button>
    </form></div></main></div>
  );
}

export default ProductForm;
