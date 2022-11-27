import React, { memo } from 'react'
import { Form, useFetcher, useLoaderData } from 'react-router-dom'
import { getContact, updateContact } from '../../utils/contacts'

const Contact = memo(() => {

    const contact = useLoaderData()

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}

                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>

                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    )
})


//destructuring props
const Favorite = ({ contact }) => {
    let favorite = contact.favorite
    const fetcher = useFetcher()

    if (fetcher.formData) {
        favorite = fetcher.formData.get("favorite") === "true"
    }

    return (
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    )
}

export const loader = async ({ params }) => {
    const { contactId } = params
    if (!contactId) {
        throw new Response("", {
            status: 404,
            statusText: "not found"
        })
    } else {
        const contact = await getContact(contactId)
        if (!contact) {
            throw new Response("", {
                status: 404,
                statusText: "contact not found"
            })
        } else return contact
    }

}

export const action = async ({ request, params }) => {

    const { contactId } = params
    let formData = await request.formData()

    return updateContact(contactId, {
        favorite: formData.get("favorite") === "true"
    })

}


export default Contact