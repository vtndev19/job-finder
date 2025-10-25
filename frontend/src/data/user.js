// src/data/user.js

const user = {
  id: "U123456",
  name: "Phạm Thanh Tú",
  email: "phamthanh.tu@example.com",
  avatar: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/11/tai-hinh-nen-dep-mien-phi.jpg",
  phone: "0123456789",
  location: "Hà Nội",
  address: "Số 2, ngõ 86 Âu Cơ, phường Tứ Liên, quận Tây Hồ, thành phố Hà Nội",
  website: "https://phamthanhtu.dev",
  linkedin: "https://linkedin.com/in/phamthanhtu",
  github: "https://github.com/phamthanhtu",
  skype: "phamthanhtu",
  bio: "Tôi là một freelancer chuyên về phát triển web và ứng dụng di động. Với kinh nghiệm 3 năm trong lĩnh vực công nghệ thông tin, tôi đã hoàn thành nhiều dự án thành công cho các khách hàng trong và ngoài nước.",
  experience: "Freelancer 3 năm kinh nghiệm làm việc từ xa",
  skills: [
    { id: 1, name: 'Xử lý dữ liệu', category: 'Data Processing' },
    { id: 2, name: 'Lập trình web', category: 'Web Development' },
    { id: 3, name: 'Thiết kế UI/UX', category: 'Design' },
    { id: 4, name: 'React.js', category: 'Frontend' },
    { id: 5, name: 'Node.js', category: 'Backend' },
    { id: 6, name: 'MongoDB', category: 'Database' }
  ],
  portfolio: [
    {
      id: 1,
      title: 'Website thương mại điện tử',
      description: 'Phát triển website bán hàng online với React và Node.js, tích hợp thanh toán online và quản lý kho hàng.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'Hoàn thành',
      date: '2024-12-15'
    },
    {
      id: 2,
      title: 'Ứng dụng quản lý khách hàng',
      description: 'Xây dựng hệ thống CRM cho doanh nghiệp với giao diện thân thiện và tính năng báo cáo chi tiết.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
      status: 'Hoàn thành',
      date: '2024-11-20'
    },
    {
      id: 3,
      title: 'Mobile App đặt hàng',
      description: 'Ứng dụng di động cho việc đặt hàng và theo dõi đơn hàng với React Native.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
      technologies: ['React Native', 'Firebase', 'Redux'],
      status: 'Đang thực hiện',
      date: '2024-10-01'
    }
  ],
  verification: {
    email: true,
    phone: false,
    identity: false
  }
};

export default user;