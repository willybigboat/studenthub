import { useState, useEffect } from "react";
import { api } from "../enum/api";
import { asyncPut, asyncGet } from "../utils/fetch";
import { useParams, useNavigate } from 'react-router-dom';
import { Student } from "../interface/Student";

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [student, setStudent] = useState<Student>({
    _id: id || '',
    userName: '',
    sid: '',
    name: '',
    department: '',
    grade: '',
    class: '',
    email: '',
    absences: 0
  });

  useEffect(() => {
    // 載入學生資料
    const fetchStudent = async () => {
      try {
        const response = await asyncGet(`${api.findById}?id=${id}`);
        if (response?.code === 200) {
          setStudent(response.body);
        } else {
          alert('無法載入學生資料');
        }
      } catch (error) {
        alert('載入資料時發生錯誤');
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: name === 'absences' ? Number(value) : value
    }));
  };

  async function handleUpdate() {
    try {
      const response = await asyncPut(api.updateStudentById, {
        id: student._id,
        userName: student.userName,
        name: student.name,
        department: student.department,
        grade: student.grade,
        class: student.class,
        email: student.email,
        absences: student.absences
      });

      if (response?.code === 200) {
        alert("更新成功");
        navigate('/');
        window.location.reload();
      } else {
        alert(`更新失敗: ${response?.message || '無法找到學生'}`);
      }
    } catch (error) {
      alert(`更新失敗: ${error instanceof Error ? error.message : '伺服器錯誤'}`);
    }
  }

  return (
    <div className="container1">
      <h2>編輯學生資料</h2>
      <p>學生 ID: {id}</p>
      
      <input 
        name="userName"
        type="text" 
        placeholder="帳號" 
        value={student.userName}
        onChange={handleInputChange}
        required 
      />
      <input 
        name="name"
        type="text" 
        placeholder="姓名" 
        value={student.name}
        onChange={handleInputChange}
        required 
      />
      <input 
        name="department"
        type="text" 
        placeholder="院系" 
        value={student.department}
        onChange={handleInputChange}
        required 
      />
      <input 
        name="grade"
        type="text" 
        placeholder="年級" 
        value={student.grade}
        onChange={handleInputChange}
        required 
      />
      <input 
        name="class"
        type="text" 
        placeholder="班級" 
        value={student.class}
        onChange={handleInputChange}
        required 
      />
      <input 
        name="email"
        type="email" 
        placeholder="信箱" 
        value={student.email}
        onChange={handleInputChange}
        required 
      />
      <input 
        name="absences"
        type="number" 
        placeholder="缺席次數" 
        value={student.absences || 0}
        onChange={handleInputChange}
      />
      
      <button onClick={handleUpdate}>確認更新</button>
      <button className="return" onClick={() => navigate('/')}>返回</button>
    </div>
  );
}