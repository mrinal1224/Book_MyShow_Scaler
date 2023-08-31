import { Modal } from 'antd'
import React from 'react'

function Shows({ openShowsModal, setOpenShowsModal, theatre }) {
    return (
        <Modal title=""
            open={openShowsModal}
            onCancel={() => setOpenShowsModal(false)}
            width={1400}
            footer={null}>

            <h1 className="text-primary text-md uppercase mb-1">
                Theatre : {theatre.name}
            </h1>
        </Modal>
    )
}

export default Shows