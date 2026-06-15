import Link from "next/link";
import { useExperienceStore } from "../../store/experienceStore";
export function CartConfirmation(){ const setStage=useExperienceStore(s=>s.setStage); return <section className="cartConfirmation"><div className="boxOutline"><span /></div><h2>ADDED TO YOUR COLLECTION</h2><nav><Link href="/checkout">CHECKOUT</Link><button onClick={()=>setStage("reveal")}>RETURN TO THE OBJECT</button></nav></section>}
