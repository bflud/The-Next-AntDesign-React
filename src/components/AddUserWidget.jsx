import { UserAddOutlined } from '@ant-design/icons';
import { Drawer, DatePicker } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUsers } from '../services/Toolkit/user.slice';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

const AddUserWidget = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        avatar: '',
        name: '',
        email: '',
        birthDate: null, // Changing to a null value for the date
    });

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setNewUser({
            avatar: '',
            name: '',
            email: '',
            birthDate: null,
        });
    };

    const handleDateChange = (date) => {
        setNewUser({ ...newUser, birthDate: date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUsers(newUser));
        onClose();
    };

    const handleRedirect = () => {
        router.push('/main').then(() => window.location.reload());
    };

    return (
        <div>
            <div className="flex flex-col items-center">
                <button className='rounded-full py-2 px-4 bg-primary text-white flex items-center gap-1' onClick={showDrawer}>
                    Adicionar novo usuário <UserAddOutlined />
                </button>
                <button className='rounded-full py-2 px-4 bg-red text-white flex items-center gap-1 mt-4' onClick={handleRedirect}>
                    Ver Landing Page
                </button>
            </div>

            <Drawer title={`Adicionar Detalhes do Usuário`} placement="right" onClose={onClose} open={open}>
                <form className='mt-10' onSubmit={handleSubmit}>
                    <div className='my-5'>
                        <label>Avatar:</label>
                        <input
                            name='avatar'
                            value={newUser.avatar}
                            onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
                            className='w-full p-2 outline-none border border-gray-300 rounded-md'
                            type='text'
                            placeholder='URL do avatar'
                        />
                    </div>
                    <div className='my-5'>
                        <label>Nome:</label>
                        <input
                            name='name'
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            className='w-full p-2 outline-none border border-gray-300 rounded-md'
                            type='text'
                            placeholder='Digite o nome do usuário'
                        />
                    </div>
                    <div className='my-5'>
                        <label>Email:</label>
                        <input
                            name='email'
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className='w-full p-2 outline-none border border-gray-300 rounded-md'
                            type='text'
                            placeholder='Digite o email do usuário'
                        />
                    </div>
                    <div className='my-5'>
                        <label>Data de Nascimento:</label>
                        <DatePicker
                            onChange={handleDateChange}
                            className='w-full p-2 outline-none border border-gray-300 rounded-md'
                            placeholder='Selecione a data de nascimento'
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            disabled={!newUser.avatar || !newUser.name || !newUser.email || !newUser.birthDate}
                            className={`border border-secondary rounded-full py-2 px-4 hover:bg-primary hover:border-white hover:text-white flex items-center gap-1 ${!newUser.avatar || !newUser.name || !newUser.email || !newUser.birthDate
                                ? 'cursor-not-allowed opacity-50'
                                : 'cursor-pointer'
                                }`}
                        >
                            Enviar <UserAddOutlined />
                        </button>
                    </div>
                </form>
            </Drawer>
        </div>
    );
};

export default AddUserWidget;
