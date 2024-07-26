import React, { useState, useEffect } from "react";
import { Button, Table, Popover, Modal, message } from "antd";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [id, setId] = useState(null);
  const [data, setData] = useState({ name: "", description: "" });
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);

  const token = localStorage.getItem("accessToken");

  const getCategories = () => {
    fetch("https://api.dezinfeksiyatashkent.uz/api/categories/")
      .then((res) => res.json())
      .then((category) => {
        setCategory(category.data);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

 // CREATE FORM
 const createForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    fetch('https://api.dezinfeksiyatashkent.uz/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          getCategories();
          handleModalClose();
          message.success('Category added successfully');
        } else {
          message.error('Error adding category');
        }
      })
      .catch((error) => {
        console.error(error);
        message.error('Error adding category');
      });
  };


  // EDIT FORM 
  const editCategory = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name);
    formData.append('description', data.description);
    fetch(`https://api.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData
    }).then(res=>res.json()).then(res=>{
      if(res.success){
        message.success("Successfully changed")
        getCategories();
        handleEditModalClose();
      } else {
        message.error("Something went wrong")
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  // DELETE FORM 
  const handleDelete = (id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        getCategories();
        hidePopover();
        message.success("Successfully deleted")
      })
      .catch((error) => {
        console.log(error);
      });
  };


  //   ACTIONS

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    resetFormData();
  };

  const resetFormData = () => {
    setData({ name: "", description: "" });
  };

  const hidePopover = () => {
    setOpenPopover(null);
  };

  const handlePopoverOpenChange = (newOpen, id) => {
    setOpenPopover(newOpen ? id : null);
  };

  const handleEditModalOpen = (item) => {
    setId(item.id)
    setOpenEditModal(true);
    setData({...data, name: item.name, description: item.description})
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  //   TABLE
  const columns = [
    {
      title: "№",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            className="mr-[10px]"
            type="primary"
            onClick={() => handleEditModalOpen(record)}
          >
            Edit
          </Button>

          <Popover
            placement="left"
            content={
              <div>
                <p>Are you sure you want to delete?</p>
                <div className="flex justify-end mt-[10px]">
                  <Button
                    size="small"
                    onClick={hidePopover}
                    className="mr-[10px]"
                  >
                    No
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => handleDelete(record.id)}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            }
            title="Are you sure"
            trigger="click"
            open={openPopover === record.id}
            onOpenChange={(newOpen) =>
              handlePopoverOpenChange(newOpen, record.id)
            }
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popover>
        </>
      ),
    },
  ];

  const dataSource = category.map((category) => ({
    key: category.id,
    ...category,
  }));
  return (
    <div>
      <div className="flex justify-between mb-[20px]">
        <h2 className="text-3xl font-bold">Category</h2>
        <Button className="rounded-md text-white bg bg-[#1677ff]" onClick={handleModalOpen}>
          Add a Category
        </Button>
      </div>

      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* CREATE MODAL  */}
      <Modal
        title="Add Category"
        open={openModal}
        onCancel={handleModalClose}
        footer={null}
      >
        <form onSubmit={createForm}>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Description</label>
            <input
              type="text"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="text-right">
            <button type="submit" className="text-white bg bg-[#1677ff] p-[10px_20px] rounded-[8px]">
              Add Location
            </button>
          </div>
        </form>
      </Modal>


      {/* EDIT MODAL  */}

      <Modal
        title="Tahrirlash"
        open={openEditModal}
        onOk={handleEditModalOpen}
        onCancel={handleEditModalClose}
        footer={null}
      >
        <form onSubmit={editCategory}>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Name</label>
            <input
              type="text"
              value={data.name}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
              onChange={(e)=>setData({...data, name:e.target.value})}
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Description</label>
            <input
              type="text"
              value={data.description}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
              onChange={(e)=>setData({...data, description:e.target.value})}
            />
          </div>
          <div className="text-right">
            <button type="submit" className="text-white bg bg-[#1677ff] p-[10px_20px] rounded-[8px]">
              Edit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;
