import { UserAddOutlined } from '@ant-design/icons';
import { Drawer, DatePicker } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUsers } from '../services/Toolkit/user.slice';
import { useRouter } from 'next/router';
import '@pqina/pintura/pintura.css';
import { openDefaultEditor } from '@pqina/pintura';
import AWS from 'aws-sdk';

const AddUserWidget = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        avatar: '',
        name: '',
        email: '',
        birthDate: null,
    });
    const [inlineResult, setInlineResult] = useState(null);

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
        setInlineResult(null); 
    };

    const handleDateChange = (date) => {
        setNewUser({ ...newUser, birthDate: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inlineResult) {
            setNewUser({ ...newUser, avatar: inlineResult });
        }

        dispatch(addUsers(newUser));
        onClose();
    };

    
    const handleAvatarChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const newAvatarURL = reader.result;
                setNewUser({ ...newUser, avatar: newAvatarURL });
    
                openDefaultEditor({
                    src: newAvatarURL,
                    onProcess: async (res) => {
                        if (res.dest) {
                            const blob = await fetch(res.dest).then((res) => res.blob());
                            const editedImageURL = URL.createObjectURL(blob);
                            setInlineResult(editedImageURL); // Salva a imagem editada no estado inlineResult
                        }
                    },
                });
            };
            reader.readAsDataURL(file);
        } else {
            console.error('Nenhum arquivo selecionado');
        }
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
                            onChange={handleAvatarChange}
                            className='w-full p-2 outline-none border border-gray-300 rounded-md'
                            type='file'
                            accept='image/*'
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
