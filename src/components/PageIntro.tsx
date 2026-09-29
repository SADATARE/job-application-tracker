import { Plus } from "lucide-react";
import "./PageIntro.css";

interface PageIntroProps{
    onAddClick: () => void;
}
 
function PageIntro({ onAddClick }: PageIntroProps){
    return (
        <section className="page-intro">
            <div>
                <h1 className="page-intro-title">Your job search, clearly organized</h1>
                <p className="page-intro-subtitle">
                    Keep momentum by knowing exactly where every application stands.
                </p>
            </div>
            <button className="add-button" type="button" onClick={onAddClick}>
                <Plus size={18} />
                Add application
            </button>
        </section>
    )
}

export default PageIntro;