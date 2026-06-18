import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
});

export const listarTurmas = async () => {
    const resposta = await api.get('/turmas');
    return resposta.data;
};

export const cadastrarTurma = async (turma) => {
    const resposta = await api.post('/turmas', turma);
    return resposta.data;
};

export const listarDoacoes = async () => {
    const resposta = await api.get('/doacoes');
    return resposta.data;
};

export const criarDoacao = async (doacao) => {
    const resposta = await api.post('/doacoes', doacao);
    return resposta.data;
};

export const excluirDoacao = async (id) => {
    const resposta = await api.delete(`/doacoes/${id}`);
    return resposta.data;
};

export const buscarRanking = async () => {
    const resposta = await api.get('/dashboard/ranking');
    return resposta.data;
};
