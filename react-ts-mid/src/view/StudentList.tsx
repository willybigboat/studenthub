import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Student } from '../interface/Student';
import { asyncDelete } from '../utils/fetch';
import { api } from "../enum/api";

interface StudentListProps {
  Students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

function StudentList({ Students, setStudents }: StudentListProps) {
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      const deleteUrl = `${api.deleteByID}?id=${encodeURIComponent(id)}`;
      const response = await asyncDelete(deleteUrl);

      if (response?.code === 200) {
        setStudents(Students.filter(student => student._id !== id));
        alert("刪除成功");
      } else {
        alert(`刪除失敗: ${response?.message || '無法找到學生ID'}`);
      }
    } catch (error) {
      alert(`刪除失敗: ${error instanceof Error ? error.message : '伺服器錯誤'}`);
    }
  };

  return (
    <div className="container">
      {Students ? Students.map((student: Student) => (
        <div className="student-card" key={student._id}>
          <div className="student-info">
            <p>帳號: {student.userName}</p>
            <p>座號: {student.sid}</p>
            <p>姓名: {student.name}</p>
            <p>院系: {student.department}</p>
            <p>年級: {student.grade}</p>
            <p>班級: {student.class}</p>
            <p>Email: {student.email}</p>
            <p>缺席次數: {student.absences || 0}</p>
          </div>
          <div className="student-actions">
            <button
              onClick={() => navigate(`/edit/${student._id}`)}
              className="action-btn edit">
              編輯
            </button>
            <button
              onClick={() => handleDelete(student._id)}
              className="action-btn delete">
              刪除
            </button>
          </div>
        </div>
      )) : <div className="loading">載入中...</div>}
    </div>
  );
}

export default StudentList;