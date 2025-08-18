import MainMenu from '../components/MainMenu.tsx'
import { Fieldset } from 'primereact/fieldset'
import { Button } from 'primereact/button'

type ButtonProps = {
  icon?: string
  title?: string
  loading?: boolean
  onClick: () => void
  severity?:
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'help'
    | 'contrast'
    | undefined
}

export function LayoutDefault({
  legend,
  button,
  children,
}: {
  legend?: string | React.ReactNode
  button?: ButtonProps
  children: React.ReactNode
}) {
  return (
    <>
      <div className="m-auto mt-1 w-4/5">
        <MainMenu />
      </div>

      <div className="relative m-auto mt-1 w-4/5 p-1">
        {button && (
          <Button
            loading={button.loading}
            title={button.title || 'Nieuw'}
            icon={button.icon || 'pi pi-plus'}
            onClick={button.onClick || (() => {})}
            severity={button.severity}
            className="r-0 absolute right-4 top-2"
          />
        )}

        {legend ? (
          <Fieldset pt={{ legend: { className: 'ml-4' } }} legend={legend}>
            {children}
          </Fieldset>
        ) : (
          children
        )}
      </div>
    </>
  )
}
