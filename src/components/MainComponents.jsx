import React, { useEffect, useState } from 'react';
import Breadcrumbs from './Breadcrumbs';
import Navbar from './Navbar';
import {
    DownCircleOutlined,
    UserAddOutlined,
    DeleteOutlined
} from '@ant-design/icons';

import { Button, Drawer } from 'antd';
import AddUserWidget from './AddUserWidget';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, removeUser } from '../services/Toolkit/user.slice';

const MainComponents = () => {
    const [showDetails, setShowDetails] = useState(-1);
    const [allUsers, setAllUsers] = useState([]);
    const dispatch = useDispatch();

    const { users } = useSelector(getAllUsers);
    
    useEffect(() => {
        setAllUsers(users);
    }, [users]);

    const handleDeleteUser = (index) => {
        dispatch(removeUser(index));
    };
    const formatBirthDate = (birthdate) => {

        const date = new Date(birthdate);
      

        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();

        const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
      
        return formattedDate;
      };
      

    return (
        <>
            <Navbar />
            <Breadcrumbs />

            <div className='bg-white py-2 rounded-lg'>
                <div className='mt-4 flex justify-between items-center'>
                    <div className='text-3xl font-semibold text-secondary'>Usuários</div>
                    <AddUserWidget />
                </div>
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-6 mt-4'>
                    <div className='bg-gradient-to-r from-primary via-primary to-primary rounded-lg px-3 py-4 text-center'>
                        <div className='text-white text-sm font-semibold'>Total de usuários</div>
                        <div className='text-white text-4xl'>{allUsers && allUsers.length}</div>
                    </div>
                    <div className='bg-gradient-to-r from-[#5CB8E4] via-[#5CB8E4] to-[#5CB8E4] rounded-lg px-3 py-4 text-center'>
                        <div className='text-white text-sm font-semibold'>Total de Admin</div>
                        <div className='text-white text-4xl'>0</div>
                    </div>
                </div>
                <div className='mt-5 bg-gray-500 h-[100vh] px-4 py-5 rounded-md'>
                    <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3  lg:gap-5'>
                        {allUsers && allUsers.length > 0 ? allUsers.map((item, index) => {
                            return (
                                <div className={`rounded-md px-3 py-4 bxswd bg-white border border-primary relative ${showDetails === index ? 'h-full' : 'h-[120px]'}`} key={index}>
                                    <div onClick={() => handleDeleteUser(index)} className='absolute right-1 -top-3 bg-white bxswww hover:bg-error cursor-pointer hover:text-white w-8 flex items-center justify-center h-8 rounded-full'><DeleteOutlined /></div>
                                    
                                    <div className='flex items-center gap-2'>
                                        {item.avatar && <img src={item.avatar} alt='avatar' className='w-8 h-8 rounded-full' />}
                                        <div className='text-secondary'><span className='font-medium'>Nome: </span>{item.name}</div>
                                    </div>
                             
                                    <div className='flex gap-2 text-secondary'><span className='font-medium'>Email: </span>{item?.email}</div>
                                    {
                                        showDetails === index && (
                                            <div className='mt-2'>
                                                <div className={`font-medium text-primary`}>Informação Adicional:</div>
                                              
                                                <div>Data de nascimento: {item?.birthDate && formatBirthDate(item.birthDate)}</div>
                                            </div>
                                        )
                                    }
                                    <div className='flex justify-center mt-3'>
                                        <button className='text-primary flex items-center gap-2' onClick={() => { setShowDetails(showDetails !== index ? index : -1) }}>{showDetails !== index ? 'Mais detalhes' : 'Menos'}<DownCircleOutlined /></button>
                                    </div>
                                </div>
                            )
                        }) : <div className='text-center'>Nenhum usuário encontrado</div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainComponents;
