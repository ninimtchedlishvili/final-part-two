import Footer from "@/app/(protected)/components/layout/Footer";
import Page from "../movie/Page";

export default async function Home() {

  return (
    <div className="bg-gray-900">
      <Page  />
      <Footer />
    </div>
  );
}
