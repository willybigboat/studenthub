import { useState } from "react";
import { api } from "../enum/api";
import { asyncPost } from "../utils/fetch";
import { useNavigate } from 'react-router-dom';

export default function insertOne() {
  const [userName, setUserName] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      if (!userName || !name || !department || !grade || !className || !email) {
        alert("請填寫所有必填欄位");
        return;
      }

      const response = await asyncPost(api.insertOne, {
        userName,
        name,
        department,
        grade,
        class: className,
        email
      });

      if (response?.code === 200) {
        alert("新增成功！");
        navigate('/');
        window.location.reload();
      } else {
        alert(`新增失敗: ${response?.message || '未知錯誤'}`);
      }
    } catch (error) {
      alert(`新增失敗: ${error instanceof Error ? error.message : '伺服器錯誤'}`);
    }
  }

  return (
    <div className="container1">
      <input type="text" placeholder="tkuxx0000" value={userName} onChange={(e) => setUserName(e.target.value)} required />
      <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
      <input type="text" placeholder="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
      <input type="text" placeholder="className" value={className} onChange={(e) => setClassName(e.target.value)} required />
      <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <button onClick={handleSubmit}>確認新增</button>
      <button className="return" onClick={() => navigate('/')}>返回</button>
    </div>
  );
}