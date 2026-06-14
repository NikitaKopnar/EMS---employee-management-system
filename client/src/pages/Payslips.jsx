import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePaySlipForm from "../components/payslip/GeneratePaySlipForm";
const Payslips = () => {
  const { user, loading: authLoading } = useAuth();
  const [paySlips, setPaySlips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.role === "ADMIN";

  const fetchPayslips = useCallback(async () => {
    try {
      const res = await api.get("/payslips");
      setPaySlips(res.data?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    }
  }, []);

  const fetchEmployees = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const res = await api.get("/employees");
      setEmployees(res.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    }
  }, [isAdmin]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchPayslips(), fetchEmployees()]);
      setLoading(false);
    };

    if (!authLoading) {
      loadData();
    }
  }, [authLoading, fetchPayslips, fetchEmployees]);

  if (authLoading || loading) return <Loading />;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Generate and manage employee payslips"
              : "Your payslips hostory"}
          </p>
        </div>
        {isAdmin && (
          <GeneratePaySlipForm
            employees={employees}
            onSuccess={fetchPayslips}
          />
        )}
      </div>
      <PayslipList payslips={paySlips} isAdmin={isAdmin} />
    </div>
  );
};

export default Payslips;
