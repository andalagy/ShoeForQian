import { product } from "../../data/product";
import { SizePlinth } from "./SizePlinth";
import { PurchaseControl } from "./PurchaseControl";
export function ClaimChamber(){return <section className="claimChamber" aria-label="Claim the object"><div className="claimText"><h2>THE FIRST FORM</h2><p>${product.price}</p><span>One form. One material.<br/>Produced in limited quantities.</span></div><SizePlinth/><PurchaseControl/></section>}
