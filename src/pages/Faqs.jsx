import React, { useEffect, useState } from 'react';
import { Button, Table, Popover, message, Modal } from 'antd';

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [data, setData] = useState({
    title_en: "",
    title_ru: "",
    title_uz: "",
    title_tr: "",
    title_zh: "",
    text_en: "",
    text_ru: "",
    text_uz: "",
    text_tr: "",
    text_zh: "",
  });
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);

  const token = localStorage.getItem("accessToken");

  const getFaqs = () => {
    fetch("https://api.dezinfeksiyatashkent.uz/api/faqs/")
      .then((res) => res.json())
      .then((faqs) => {
        setFaqs(faqs.data);
      });
  };

  useEffect(() => {
    getFaqs();
  }, []);

  // CREATE FORM
  const createForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title_en', data.title_en);
    formData.append('title_ru', data.title_ru);
    formData.append('title_uz', data.title_uz);
    formData.append('title_zh', data.title_zh);
    formData.append('title_tr', data.title_tr);
    formData.append('text_en', data.text_en);
    formData.append('text_ru', data.text_ru);
    formData.append('text_uz', data.text_uz);
    formData.append('text_zh', data.text_zh);
    formData.append('text_tr', data.text_tr);
    fetch('https://api.dezinfeksiyatashkent.uz/api/faqs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          getFaqs();
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
  const editFaqs = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title_en', data.title_en);
    formData.append('title_ru', data.title_ru);
    formData.append('title_uz', data.title_uz);
    formData.append('title_zh', data.title_zh);
    formData.append('title_tr', data.title_tr);
    formData.append('text_en', data.text_en);
    formData.append('text_ru', data.text_ru);
    formData.append('text_uz', data.text_uz);
    formData.append('text_zh', data.text_zh);
    formData.append('text_tr', data.text_tr);
    fetch(`https://api.dezinfeksiyatashkent.uz/api/faqs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData
    }).then(res=>res.json()).then(res=>{
      if(res.success){
        message.success("Successfully changed")
        getFaqs();
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
    fetch(`https://api.dezinfeksiyatashkent.uz/api/faqs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        getFaqs();
        hidePopover();
        resetFormData()
        message.success("Successfully deleted")
      })
      .catch((error) => {
        console.log(error);
      });
  };



  // ACTIONS
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    resetFormData();
  };

  const resetFormData = () => {
    setData({
      title_en: "",
      title_ru: "",
      title_uz: "",
      title_tr: "",
      title_zh: "",
      text_en: "",
      text_ru: "",
      text_uz: "",
      text_tr: "",
      text_zh: "",
    });
  };

  const hidePopover = () => {
    setOpenPopover(null);
  };

  const handlePopoverOpenChange = (newOpen, id) => {
    setOpenPopover(newOpen ? id : null);
  };

  const handleEditModalOpen = (item) => {
    setId(item.id);
    setOpenEditModal(true);
    setData({
      ...data,
      title_en: item.title_en,
      title_ru: item.title_ru,
      title_uz: item.title_uz,
      title_zh: item.title_zh,
      title_tr: item.title_tr,
      text_en: item.text_en,
      text_ru: item.text_ru,
      text_uz: item.text_uz,
      text_zh: item.text_zh,
      text_tr: item.text_tr,
    });
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  // TABLE
  const columns = [
    {
      title: "№",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Title and Text (EN)",
      dataIndex: "titleAndTextEn",
      key: "titleAndTextEn",
      render: (text, record) => (
        <>
          <div>{record.title_en}</div>
          <div>{record.text_en}</div>
        </>
      ),
    },
    {
      title: "Title and Text (RU)",
      dataIndex: "titleAndTextRu",
      key: "titleAndTextRu",
      render: (text, record) => (
        <>
          <div>{record.title_ru}</div>
          <div>{record.text_ru}</div>
        </>
      ),
    },
    {
      title: "Title and Text (UZ)",
      dataIndex: "titleAndTextUz",
      key: "titleAndTextUz",
      render: (text, record) => (
        <>
          <div>{record.title_uz}</div>
          <div>{record.text_uz}</div>
        </>
      ),
    },
    {
      title: "Title and Text (ZH)",
      dataIndex: "titleAndTextZh",
      key: "titleAndTextZh",
      render: (text, record) => (
        <>
          <div>{record.title_zh}</div>
          <div>{record.text_zh}</div>
        </>
      ),
    },
    {
      title: "Title and Text (TR)",
      dataIndex: "titleAndTextTr",
      key: "titleAndTextTr",
      render: (text, record) => (
        <>
          <div>{record.title_tr}</div>
          <div>{record.text_tr}</div>
        </>
      ),
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

  const dataSource = faqs.map((faq, index) => ({
    key: faq.id,
    number: index + 1,
    ...faq,
    titleAndTextEn: `${faq.title_en} ${faq.text_en}`,
    titleAndTextRu: `${faq.title_ru} ${faq.text_ru}`,
    titleAndTextUz: `${faq.title_uz} ${faq.text_uz}`,
    titleAndTextZh: `${faq.title_zh} ${faq.text_zh}`,
    titleAndTextTr: `${faq.title_tr} ${faq.text_tr}`,
  }));

  return (
    <div>
      <div className="flex justify-between mb-[20px]">
        <h2 className="text-3xl font-bold">Faqs</h2>
        <Button className="rounded-md text-white bg bg-[#1677ff]" onClick={handleModalOpen}>
          Add a Faq
        </Button>
      </div>

      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 6 }}
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
            <label className="block mb-[5px]">Title (en)</label>
            <input
              type="text"
              value={data.title_en}
              onChange={(e) => setData({ ...data, title_en: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Text (en)</label>
            <input
              type="text"
              value={data.text_en}
              onChange={(e) => setData({ ...data, text_en: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Title (ru)</label>
            <input
              type="text"
              value={data.title_ru}
              onChange={(e) => setData({ ...data, title_ru: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Text (ru)</label>
            <input
              type="text"
              value={data.text_ru}
              onChange={(e) => setData({ ...data, text_ru: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Title (uz)</label>
            <input
              type="text"
              value={data.title_uz}
              onChange={(e) => setData({ ...data, title_uz: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Text (uz)</label>
            <input
              type="text"
              value={data.text_uz}
              onChange={(e) => setData({ ...data, text_uz: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Title (zh)</label>
            <input
              type="text"
              value={data.title_zh}
              onChange={(e) => setData({ ...data, title_zh: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Text (zh)</label>
            <input
              type="text"
              value={data.text_zh}
              onChange={(e) => setData({ ...data, text_zh: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Title (tr)</label>
            <input
              type="text"
              value={data.title_tr}
              onChange={(e) => setData({ ...data, title_tr: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Text (tr)</label>
            <input
              type="text"
              value={data.text_tr}
              onChange={(e) => setData({ ...data, text_tr: e.target.value })}
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
        <form onSubmit={editFaqs}>
        <div className="mb-[20px]">
            <label className="block mb-[5px]">Title (en)</label>
            <input
              type="text"
              value={data.title_en}
              onChange={(e) => setData({ ...data, title_en: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Text (en)</label>
            <input
              type="text"
              value={data.text_en}
              onChange={(e) => setData({ ...data, text_en: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Title (ru)</label>
            <input
              type="text"
              value={data.title_ru}
              onChange={(e) => setData({ ...data, title_ru: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Text (ru)</label>
            <input
              type="text"
              value={data.text_ru}
              onChange={(e) => setData({ ...data, text_ru: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Title (uz)</label>
            <input
              type="text"
              value={data.title_uz}
              onChange={(e) => setData({ ...data, title_uz: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Text (uz)</label>
            <input
              type="text"
              value={data.text_uz}
              onChange={(e) => setData({ ...data, text_uz: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Title (zh)</label>
            <input
              type="text"
              value={data.title_zh}
              onChange={(e) => setData({ ...data, title_zh: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Text (zh)</label>
            <input
              type="text"
              value={data.text_zh}
              onChange={(e) => setData({ ...data, text_zh: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Title (tr)</label>
            <input
              type="text"
              value={data.title_tr}
              onChange={(e) => setData({ ...data, title_tr: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
            />
          </div>
          <div className="mb-[20px]">
            <label className="block mb-[5px]">Text (tr)</label>
            <input
              type="text"
              value={data.text_tr}
              onChange={(e) => setData({ ...data, text_tr: e.target.value })}
              className="w-full p-[8px] border border-[#e5e7eb] rounded"
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

export default Faqs;
