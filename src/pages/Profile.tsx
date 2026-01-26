import React, { useEffect, useState } from "react";

interface IUser {
  firstName: string;
  lastName: string;
  maidenName: string;
  email: string;
  phone: string;
  password: string;
  company: {
    department: string;
  };
  image: string;
}

export const Profile = () => {
  const [users, setUserList] = useState<IUser[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://dummyjson.com/users");
        const json = await res.json();
        setUserList(json?.users);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">User List</h2>

      <div className="space-y-4">
        {users?.map((user, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div>
                <h3 className="text-lg font-semibold">
                  {`${user.firstName} ${user.maidenName ?? ""} ${
                    user.lastName
                  }`}
                </h3>

                <p className="text-sm text-gray-600">{user.email}</p>

                <p className="text-sm text-gray-600">{user.phone}</p>

                <p className="text-sm text-gray-500">
                  {user.company?.department}
                </p>
              </div>
            </div>
          </div>
        ))}

        {!users?.length && <p className="text-gray-500">No users found.</p>}
      </div>
    </div>
  );
};
