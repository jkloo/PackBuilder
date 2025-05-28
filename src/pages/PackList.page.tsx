import { colorForPitch } from "@/components/PitchIndicator/PitchIndicator";
import { PackBreakdownChart, PackBreakdownTable, PackCommonsChart, PackCommonsTable } from "@/components/Stats/Stats";
import { PackModel } from "@/Models/Pack.model";
import { computeAverages } from "@/Models/PackStats.model";
import { useAppStore } from "@/Store/store";
import { AppShell, Button, Container, Group, ScrollArea, Table, Title, Text, Space, Stack, Center, Paper, Modal, List } from "@mantine/core";
import { IconBox, IconCards, IconDownload, IconEdit, IconPlus, IconTrash, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function PackList({packs, boxId=undefined}: {packs: PackModel[], boxId?: string}) {

  const navigate = useNavigate()

  const deletePack = useAppStore((state) => state.delete)

  const [toDelete, setToDelete] = useState(undefined as PackModel|undefined)

  const confirmDelete = (pack: PackModel) => {
    setToDelete(pack)
  }

  const handleDelete = (pack: PackModel) => {
    deletePack(pack)
    setToDelete(undefined)
  }

  const downloadFile = ({ data, fileName, fileType }: { data:string, fileName:string, fileType:string }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const handleDownload = () => {
    downloadFile({
      data: JSON.stringify(packs.values().toArray()),
      fileName: 'packs.json',
      fileType: 'text/json',
    })
  }

  const handleImport= () => {

  }

  const rows = packs.map((pack, index) => {
    return (
      <Table.Tr key={pack.id}>
        <Table.Td>{pack.cards.length}</Table.Td>
        <Table.Td>
          <Button onClick={() => navigate(`/packs/${pack.id}`)} variant='default'>
            <Group gap="sm" >
              <IconCards size={16}/>
              <Text>{pack.id}</Text>
            </Group>
          </Button>
        </Table.Td>
        <Table.Td>
          <Button disabled={!!boxId} onClick={() => navigate(`/boxes/${pack.boxId}`)} variant='default'>
            <Group gap="sm" >
              <IconBox size={16}/>
              <Text>{pack.boxId}</Text>
            </Group>
          </Button>
          
        </Table.Td>
        <Table.Td>
          <Group justify='right'>
            <Button variant="light" color="red" onClick={() => confirmDelete(pack)}>
              <IconTrash size={24} stroke={1.5}/>
            </Button>
            <Button variant="light" onClick={() => navigate(`/packs/${pack.id}/edit`)}>
              <IconEdit size={24} stroke={1.5}/>
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
    <AppShell.Main>
      <Container>
        <Title>{boxId ? `Packs in Box (${boxId})` : 'Packs' }</Title>
        <Group justify="flex-end">
          <Button
            onClick={() => handleImport()}
            variant='outline'
            leftSection={
              <IconUpload size={16}/>
            }
          >
            <Text>Import</Text>
          </Button>
          <Button
            onClick={() => handleDownload()}
            leftSection={<IconDownload size={16}/>}
            variant='outline'>
              
            <Text>Download</Text>
          </Button>
          <Button onClick={() => navigate(boxId ? `/packs/new?boxId=${boxId}` : '/packs/new')}>
            <Group gap='xs'>
              <IconPlus size={16}/>
              <Text>New</Text>
            </Group>
          </Button>
        </Group>
        <Space h='lg'/>
        <ScrollArea>
          <Table miw={640} verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Card Count</Table.Th>
                <Table.Th>Pack Id</Table.Th>
                <Table.Th>Box Id</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Container>
    </AppShell.Main>

    <AppShell.Aside>
      <Paper p='md' withBorder radius={0}>
        <Title order={2}>Commons (Average)</Title>
      </Paper>
      <ScrollArea>
        <Stack p='md'>
          <StatsSection packs={packs}/>
          <Space h='xl'/>
        </Stack>
      </ScrollArea>
    </AppShell.Aside>

    
    <Modal opened={!!toDelete} onClose={()=>{
      setToDelete(undefined)
    }} centered title={
      <Title order={3}>Confirm Delete</Title>
    }>
      { toDelete 
        ? <Group justify="space-between">
          <List p='md'>
          {
            toDelete!.cards.slice(0, 7).map((card, index) => (
              <List.Item key={`${card.printing_unique_id}-${index}`}>
                <Text c={colorForPitch(card.pitch)}>
                  {card.name}
                </Text>
              </List.Item>
            ))
          }
        </List>
        <List p='md'>
          {
            toDelete!.cards.slice(7).map((card, index) => (
              <List.Item key={`${card.printing_unique_id}-${index}`}>
                <Text c={colorForPitch(card.pitch)}>
                  {card.name}
                </Text>
              </List.Item>
            ))
          }
          
        </List>
        </Group>
        : undefined
      }
      <Group mt="xl" justify='flex-end'>
        <Button variant='default' onClick={()=>{setToDelete(undefined)}}>Cancel</Button>
        <Button color='red' onClick={() => {handleDelete(toDelete!)}}>Delete</Button>
      </Group>
    </Modal>
    </>
  );
}

function StatsSection({packs}:{packs: PackModel[]}) {
  const averages = computeAverages(packs.map((p) => p.cards))

  return (
    <>
    <Stack>
      <Title order={3}>By Class</Title>
      <Center>
        <PackCommonsChart stats={averages} />
      </Center>
      <PackCommonsTable stats={averages} />
      <Title order={3}>Pack Structure</Title>
      <Center>
        <PackBreakdownChart stats={averages} />
      </Center>
      <PackBreakdownTable stats={averages} />
    </Stack>
    </>
  )
}