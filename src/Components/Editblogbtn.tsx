//@ts-nocheck
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import gql from "graphql-tag";
import gqlclient from "@/services/graph";
import { useState } from "react";

const UPDATE_BLOG = gql`
mutation Mutation($id: String!, $title: String, $content: String, $imageUrl: String) {
  updateblog(id: $id, title: $title, content: $content, imageUrl: $imageUrl) 
}`

export default function Editblogbtn({ blog }) {

    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    const [imageUrl, setImgurl] = useState(blog.imageUrl);

    async function handleSubmit() {

        try {
            const data: {
                updateblog: boolean
            } = await gqlclient.request(UPDATE_BLOG, {
                id: blog.id,
                title,
                content,
                imageUrl
            })

            if (data.updateblog) {
                alert("Updated")
            } 
            else {
                alert("Failed")
            }
        }

        catch (error) {
            alert("Something went wrong")
        }

    }


    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="ghost" color="gray" className="p-1">✏️ </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit Blog</Dialog.Title>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Title
                        </Text>
                        <TextField.Root
                            defaultValue={title}
                            onChange={(e) => setTitle(e.target.value)}

                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Content
                        </Text>
                        <TextField.Root
                            defaultValue={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Image
                        </Text>
                        <TextField.Root
                            defaultValue={imageUrl}
                            onChange={(e) => setImgurl(e.target.value)}
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleSubmit}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )

}