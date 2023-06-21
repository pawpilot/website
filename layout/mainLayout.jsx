import Navbar from "../components/navigation/navbar";
import Socials from "../components/footer";

export default function MainLayout({ children }) {
	return (
<div>

         
            <Navbar />
            {children}

      <Socials/>      

                  
	
</div>
	);
}
