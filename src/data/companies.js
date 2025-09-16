import fptLogo from "../assets/images/fpt.png";
import viettelLogo from "../assets/images/viettel.png";
import vngLogo from "../assets/images/vng.png";
const companies = [
  {
    id: 1,
    name: "FPT Software",
    logo: fptLogo,
    industry: "Phần mềm & CNTT",
    location: "Hà Nội, Việt Nam",
    size: "10,000+ nhân viên",
    description: "FPT Software là công ty công nghệ hàng đầu Việt Nam.",
    jobs: [
      { id: 1, title: "Frontend Developer", location: "Hà Nội" },
      { id: 2, title: "AI Engineer", location: "Đà Nẵng" }
    ]
  },
  {
    id: 2,
    name: "Viettel",
    logo: viettelLogo,
    industry: "Viễn thông & Công nghệ",
    location: "Hà Nội, Việt Nam",
    size: "30,000+ nhân viên",
    description: "Viettel là tập đoàn viễn thông lớn nhất Việt Nam.",
    jobs: [
      { id: 3, title: "Data Analyst", location: "Hà Nội" },
      { id: 4, title: "Network Engineer", location: "TP. HCM" }
    ]
  },
  {
    id: 3,
    name: "VNG Corporation",
    logo: vngLogo,
    industry: "Internet & Game",
    location: "TP Hồ Chí Minh, Việt Nam",
    size: "4000+ nhân viên",
    description: "Công ty công nghệ hàng đầu Việt Nam với nhiêu sản phẩm nổi bật.",
    jobs: [
      { id: 5, title: "Fresher", location: "TP. HCM" },
      { id: 6, title: "Test Game", location: "TP. HCM" }
    ]
  }
];

export default companies;
