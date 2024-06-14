import React, { useState } from 'react';
import { useCreateGenreMutation, useFetchGenresQuery, useDeleteGenreMutation, useUpdateGenreMutation } from '../../redux/api/Genre';
import GenreForm from '../../components/GenreForm';
import Model from '../../components/Model';

const GenreList = () => {
    const { data: genres, refetch } = useFetchGenresQuery();
    const [name, setName] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [updatingName, setUpdatingName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [createGenre] = useCreateGenreMutation();
    const [updateGenre] = useUpdateGenreMutation();
    const [deleteGenre] = useDeleteGenreMutation();

    // Handle create genre function
    const handleCreateGenre = async (e) => {
        e.preventDefault();
        try {
            await createGenre({ name }).unwrap();
            setName('');
            refetch();
        } catch (error) {
            console.error('Failed to create genre:', error);
        }
    };

    // Handle update genre function
    const handleUpdateGenre = async () => {
        try {
            await updateGenre({ id: selectedGenre._id, name: updatingName }).unwrap();
            setModalVisible(false);
            refetch();
        } catch (error) {
            console.error('Failed to update genre:', error);
        }
    };

    // Handle delete genre function
    const handleDeleteGenre = async () => {
        try {
            await deleteGenre(selectedGenre._id).unwrap();
            setModalVisible(false);
            refetch();
        } catch (error) {
            console.error('Failed to delete genre:', error);
        }
    };

    return (
        <div className='ml-[10rem] flex-col md:flex-row'>
            <div className='md:3-3/4 p-3'>
                <h1 className='h-12'>Manage Genres</h1>
                <GenreForm value={name} setValue={setName} handleSubmit={handleCreateGenre} />
                <br />
                <div className='flex flex-wrap'>
                    {genres?.map((genre) => (
                        <div key={genre._id}>
                            <button className='bg-white border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'
                                onClick={() => {
                                    setSelectedGenre(genre);
                                    setUpdatingName(genre.name);
                                    setModalVisible(true);
                                }}
                            >
                                {genre.name}
                            </button>
                        </div>
                    ))}
                </div>
                <Model
                    isOpen={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    contentLabel='Update Genre Modal'
                >
                    <h2>Update Genre</h2>
                    <GenreForm
                        value={updatingName}
                        setValue={setUpdatingName} // Corrected to match state setter function
                        // handleSubmit={handleUpdateGenre} // Corrected function call
                        buttonText='Update'
                        // handleDelete={handleDeleteGenre}
                    />
                </Model>
            </div>
        </div>
    );
};

export default GenreList;
