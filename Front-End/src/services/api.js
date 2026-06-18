import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const listarTurmas = async () => {
    const resposta = await api.get('/turmas');
    return resposta.data;
};

export const cadastrarTurma = async (turma) => {
    const resposta = await api.post('/turmas', turma);
    return resposta.data;
};

export const buscarRanking = async () => {
    const resposta = await api.get('/dashboard/ranking');
    return resposta.data;
};