import { useEffect, useRef, useState } from 'react';
import '../style/App.css';
import { asyncGet } from '../utils/fetch';
import { api } from '../enum/api';
import { Student } from '../interface/Student';
import { resp } from '../interface/resp';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentList from './StudentList';
import Add from "../view/Add";
import Find from '../view/Find';
import Update from '../view/Update';

function App() {
  const [students, setStudents] = useState<Array<Student>>([]);
  const cache = useRef<boolean>(false);

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code == 200) {
          setStudents(res.body);
        }
      });
    }
  }, []);

  return (
    <div className="app">
      <nav className="nav-menu">
        <Link to="/" className="nav-btn">學生列表</Link>
        <Link to="/add" className="nav-btn">新增學生</Link>
        <Link to="/search" className="nav-btn">搜尋學生</Link>
      </nav>

      <Routes>
        <Route path="/" element={<StudentList Students={students} setStudents={setStudents} />} />
        <Route path="/add" element={<Add />} />
        <Route path="/search" element={<Find />} />
        <Route path="/edit/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
