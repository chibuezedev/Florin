import { useState, useEffect } from "react";
import { userService } from "../lib/api/userService";

export const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const result = await userService.getProfile();
      if (result.success) {
        setProfile(result.data);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, error, refetch: fetchProfile };
};

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateProfile = async (data: {
    name?: string;
    department?: string;
    level?: string;
    program?: string;
    studentId?: string;
    employeeId?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await userService.updateProfile(data);
      if (result.success) {
        setSuccess(true);
        return result.data;
      } else {
        setError(result.message);
        return null;
      }
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error, success };
};

export const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updatePassword = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await userService.updatePassword(data);
      if (result.success) {
        setSuccess(true);
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { updatePassword, loading, error, success, reset };
};

export const useUpdateEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateEmail = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await userService.updateEmail(data);
      if (result.success) {
        setSuccess(true);
        return result.data;
      } else {
        setError(result.message);
        return null;
      }
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { updateEmail, loading, error, success, reset };
};

export const useDeactivateAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deactivateAccount = async (password: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await userService.deactivateAccount(password);
      if (result.success) {
        setSuccess(true);
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deactivateAccount, loading, error, success };
};

export const useUsers = (filters?: {
  role?: string;
  department?: string;
  level?: string;
  isActive?: string;
  page?: number;
  limit?: number;
}) => {
  const [users, setUsers] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const result = await userService.getAllUsers(filters);
      if (result.success) {
        setUsers(result.data);
        setPagination(result.pagination);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [JSON.stringify(filters)]);

  return { users, pagination, loading, error, refetch: fetchUsers };
};

export const useUser = (id: string) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const result = await userService.getUserById(id);
      if (result.success) {
        setUser(result.data);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  return { user, loading, error, refetch: fetchUser };
};

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUser = async (
    id: string,
    data: {
      name?: string;
      email?: string;
      role?: string;
      department?: string;
      level?: string;
      program?: string;
      studentId?: string;
      employeeId?: string;
      isActive?: boolean;
    }
  ) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await userService.updateUser(id, data);
      if (result.success) {
        setSuccess(true);
        return result.data;
      } else {
        setError(result.message);
        return null;
      }
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error, success };
};

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await userService.deleteUser(id);
      if (result.success) {
        setSuccess(true);
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error, success };
};
