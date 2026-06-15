import { useExperienceStore } from "../../store/experienceStore";
export function PurchaseControl(){ const {selectedSize,addToCart}=useExperienceStore(); if(!selectedSize) return null; return <button className="purchaseLine" onClick={addToCart}><span>CLAIM THIS PAIR</span></button>}
