import Link from "next/link";

export default function About() {
return (
    <div>
    <center> 
     <Link href="Home"> Home </Link> | <Link href="/about"> About </Link> | <Link href="/service"> Service </Link> | <Link href="/contact"> Contact </Link>  </center>
   <div><center> About page </center> </div>
   </div>
 );
}
