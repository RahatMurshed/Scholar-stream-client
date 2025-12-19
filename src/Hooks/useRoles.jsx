import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRoles = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading : roleLoading, data: role } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data?.role || 'Student';
        }
    })

    return { roleLoading, role };
};

export default useRoles;