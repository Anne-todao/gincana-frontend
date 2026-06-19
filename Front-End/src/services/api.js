import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const usuarioData = localStorage.getItem('usuarioLogado');
        if (usuarioData) {
            const usuarioObj = JSON.parse(usuarioData);
            const token = usuarioObj?.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

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

export const listarOngs = async () => {
    const resposta = await api.get('/gerenciarOngs');
    return resposta.data;
};

export const criarOng = async (ong) => {
    const serverOng = {
        nome_ong: ong.nome,
        categoria: ong.categoria,
        contato: ong.contato,
    };
    const resposta = await api.post('/gerenciarOngs', serverOng);
    return resposta.data;
};

export const excluirOng = async (id) => {
    const resposta = await api.delete(`/gerenciarOngs/${id}`);
    return resposta.data;
};
