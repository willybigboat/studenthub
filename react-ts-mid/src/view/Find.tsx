import { useState } from "react"
import { asyncGet, asyncDelete } from "../utils/fetch";
import { api } from "../enum/api";
import { Student } from "../interface/Student";
import { useNavigate } from 'react-router-dom';

export default function Find() {
    const [ID, setID] = useState<string>("");
    const [student, setStudent] = useState<Student>();
    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const response = await asyncGet(`${api.findById}?id=${ID}`)
            if (response?.code == 200) {
                //alert("找到囉!");
                setID("");
                setStudent(response.body);
            } else {
                alert("找不到呦")
            }
        } catch (error) {
            alert("server error");
        }
    }

    const handleDelete = async (id: string) => {
        try {
            console.log('Deleting student with ID:', id);
            const deleteUrl = `${api.deleteByID}?id=${encodeURIComponent(id)}`;
            console.log('Delete URL:', deleteUrl);

            const response = await asyncDelete(deleteUrl);
            console.log('Delete response:', response);

            if (response?.code === 200) {
                alert("刪除成功");
                setStudent(undefined); // 清空當前顯示的學生資料
                navigate('/'); // 返回主頁
                window.location.reload(); // 重新載入頁面以更新列表
            } else {
                alert(`刪除失敗: ${response?.message || '無法找到學生ID'}`);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert(`刪除失敗: ${error instanceof Error ? error.message : '伺服器錯誤'}`);
        }
    };

    return (
        <div className="container1">
            <input 
                type="text" 
                placeholder="請輸入ID" 
                value={ID}
                onChange={(e) => setID(e.target.value)} 
                required 
            />
            <button onClick={handleSubmit}>尋找</button>

            {student && (
                <div className="student-card">
                    <div className="student-info">
                        <p>帳號: {student.userName}</p>
                        <p>座號: {student.sid}</p>
                        <p>姓名: {student.name}</p>
                        <p>院系: {student.department}</p>
                        <p>年級: {student.grade}</p>
                        <p>班級: {student.class}</p>
                        <p>Email: {student.email}</p>
                    </div>
                    <div className="student-actions">
                        <button 
                            className="action-btn edit"
                            onClick={() => navigate(`/edit/${student._id}`)}
                        >
                            編輯
                        </button>
                        <button 
                            className="action-btn delete"
                            onClick={() => handleDelete(student._id)}
                        >
                            刪除
                        </button>
                    </div>
                </div>
            )}
            <button className="return" onClick={() => navigate('/')}>返回</button>
        </div>
    )
}